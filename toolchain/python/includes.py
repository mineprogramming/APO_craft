from os.path import *
import glob
import json
from make_config import make_config
from fancy_output import *
from utils import move_file, copy_file
import os


params_list = {
    "allowJs": False,
    "allowUnusedLabels": False,
    "alwaysStrict":	 False,
    "assumeChangesOnlyAffectDirectDependencies": False,
    "checkJs": False,
    "declaration": False,
    "diagnostics": False,
    "disableSizeLimit":	False,
    "downlevelIteration": False,
    "emitDeclarationOnly": False,
    "experimentalDecorators": False,
    "extendedDiagnostics": False,
    "importHelpers": False,
    "listEmittedFiles":	False,
    "listFiles": False,
    "locale": "en",
    "noEmit": False,
    "noEmitHelpers": False,
    "noEmitOnError": False,
    "noErrorTruncation": False,
    "noFallthroughCasesInSwitch": False,
    "noLib": False,
    "noResolve": False,
    "noStrictGenericChecks": False,
    "noUnusedLocals": False,
    "noUnusedParameters": False,
    "preserveConstEnums": False,
    "preserveSymlinks":	False,
    "pretty": True,
    "removeComments": False,
    "showConfig": False,
    "skipLibCheck": False,
    "sourceMap": False,
    "strict": False,
    "tsBuildInfoFile": 	".tsbuildinfo"
}

temp_directory = make_config.get_path("toolchain/build/typescript")


class Includes:

    def __init__(self, directory):
        self.file = join(directory, ".includes")
        self.directory = directory
        self.files = []
        self.params = {}

    def read(self):
        with open(self.file, encoding="utf-8") as includes:
            for line in includes:
                line = line.strip()
                self.decode_line(line)

    def decode_line(self, line):
        if line.startswith("#"):  # comment or parameter
            pair = [item.strip() for item in line[1:].strip().split(":")]
            key = pair[0]

            if key in params_list:
                default = params_list[key]

                if len(pair) > 1:
                    v = pair[1].lower()
                    self.params[key] = v == "true" if v in ["true", "false"] else v
                else:
                    self.params[key] = True if isinstance(default, bool) else default

        elif len(line) < 1 or line.startswith("//"):
            return

        else:
            search_path = (join(self.directory, line[:-2], ".") + "/**/*") if line.endswith("/.") else join(self.directory, line)
            for file in glob.glob(search_path, recursive=True):
                file = normpath(file)
                if file not in self.files:
                    self.files.append(relpath(file, self.directory).replace("\\", "/"))

    def create(self):
        with open(self.file, "w") as includes:
            params = ["# " + key + ((": " + str(self.params[key])).lower() if not self.params[key] else "") + '\n' for key in self.params]
            files = [file + '\n' for file in self.files]

            includes.write("# autogenerated includes")
            includes.write('\n\n')
            includes.writelines(params)
            includes.write('\n')
            includes.writelines(files)

    @staticmethod
    def create_from_directory(directory):
        includes = Includes(directory)
        includes.files = [normpath(relpath(file, directory)) for file in glob.glob(f"{directory}/**/*", recursive=True)]
        includes.params = {}
        includes.create()

        return includes

    @staticmethod
    def create_from_tsconfig(directory):
        with open(join(directory, "tsconfig.json")) as tsconfig:
            config = json.load(tsconfig)

            params = config["compilerOptions"]
            files = config["include"]

            if "target" in params:
                del params["target"]
            if "lib" in params:
                del params["lib"]
            if "outFile" in params:
                del params["outFile"]

        includes = Includes(directory)
        includes.files = files
        includes.params = params
        includes.create()

        return includes

    @staticmethod
    def invalidate(directory):
        if not isfile(join(directory, ".includes")):
            tsconfig_path = join(directory, "tsconfig.json")
            if isfile(tsconfig_path):
                includes = Includes.create_from_tsconfig(directory)
            else:
                includes = Includes.create_from_directory(directory)
        else:
            includes = Includes(directory)
        includes.read()

        return includes

    def build(self, target_path):
        temp_path = declarations_name = join(temp_directory, basename(target_path))

        result = 0
        self.create_tsconfig(temp_path)
        if self.is_source_changed(temp_path):
            print(f"building {basename(target_path)}")
            result = self.build_source(temp_path)
        else:
            print(f"{basename(target_path)} is not changed")
        copy_file(temp_path, target_path)
        return result

    def get_tsconfig(self):
        return join(self.directory, "tsconfig.json")

    def is_source_changed(self, temp_path):
        if not isfile(temp_path):
            return True

        last_build_time = getmtime(temp_path)
        for file in self.files:
            time = getmtime(join(self.directory, file))
            if time > last_build_time:
                return True

        return False

    def create_tsconfig(self, temp_path):
        headers = []
        headers.extend(glob.glob(make_config.get_path(
            "toolchain/jslibs/**/*.d.ts"), recursive=True))
        headers.extend(glob.glob(make_config.get_path(
            "toolchain/build/typescript-headers/**/*.d.ts"), recursive=True))

        currentName = splitext(basename(temp_path))[0]
        for header in headers:
            if header.endswith(f"{currentName}.d.ts"):
                headers.remove(header)

        template = {
            "compilerOptions": {
                "target": "ES5",
                "lib": ["ESNext"],
                "outFile": temp_path,
                "experimentalDecorators": True,
                "downlevelIteration": True,
                "allowJs": True
            },
            "exclude": [
                "**/node_modules/*",
                "dom",
                "webpack"
            ],
            "include": self.files,
            "files": headers
        }

        for key, value in self.params.items():
            template["compilerOptions"][key] = value

        with open(self.get_tsconfig(), "w") as tsconfig:
            json.dump(template, tsconfig, indent="\t")

    def build_source(self, temp_path):
        result = os.system(f'tsc -p "{self.get_tsconfig()}"')

        declaration_path = f"{splitext(temp_path)[0]}.d.ts"
        if(isfile(declaration_path)):
            move_file(declaration_path, join(make_config.get_path("toolchain/build/typescript-headers"), basename(declaration_path)))

        return result

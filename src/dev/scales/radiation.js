var radiationScale = new ScalesRPG.Scale({
    bitmaps:{
        full: BitmapFactory.decodeFile(__dir__ + "gui/scale_radiation_0.png"), 
        half: BitmapFactory.decodeFile(__dir__ + "gui/scale_radiation_1.png"), 
        empty: BitmapFactory.decodeFile(__dir__ + "gui/scale_radiation_2.png")
    },
    value: 4,
    defaultValue: 0
});
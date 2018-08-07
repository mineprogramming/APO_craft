var biologicalScale = new ScalesRPG.Scale({
    bitmaps: {
        full: BitmapFactory.decodeFile(__dir__ + "gui/scale_biological_0.png"), 
        half: BitmapFactory.decodeFile(__dir__ + "gui/scale_biological_1.png"), 
        empty: BitmapFactory.decodeFile(__dir__ + "gui/scale_biological_2.png")
    },
    value: 3,
    defaultValue: 0
});
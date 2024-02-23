const ItemModel = require("../models/Item")


exports.addItem = async (req, res) => {
    console.log(req.body);
    try{
        if (req.body.url && req.body.note) {
            let item = ItemModel({
                url: req.body.url,
                note: req.body.note
            })

            await item.save();
            
            res.send("Item : ["+item+"] is well stored");
        } else {
            console.log("Missing some info (Item : url, note)")
    
        }
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).send('Internal Server Error');
    }
    


}
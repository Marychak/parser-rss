import cron from "node-cron";
import Parser from 'rss-parser';

import PostModel from "../models/post.js";

export default () => {
    const parser = new Parser();

    cron.schedule('0 * * * *', () => {
        parser.parseURL('http://lifehacker.com/rss ')
            .then(feed => {
                feed.items.forEach(item => {
                    PostModel.findOne({guid: item.guid}).then((err, existingItem) => {
                        if (err) {
                            console.error(err);
                            return;
                        }

                        if (!existingItem) {
                            const newPost = new PostModel(item);
                            newPost.save();
                        }
                    });
                });
            });
    });
}
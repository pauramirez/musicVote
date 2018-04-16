import { Mongo } from 'meteor/mongo';
import {SimpleSchema} from "simpl-schema/dist/SimpleSchema";
import {Meteor} from "meteor/meteor";
import {Posts} from "./posts";


export const userEventsList = new Mongo.Collection('listPosts');

if(Meteor.isServer){
    Meteor.publish("listPosts", () => {
        return userPostList.find({});
    });
}

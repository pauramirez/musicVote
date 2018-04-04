import { Mongo } from "meteor/mongo";
//Se recomienda el uso de Meteor methods para manejar los inserts en la base de datos

export const Posts = new Mongo.Collection("posts");

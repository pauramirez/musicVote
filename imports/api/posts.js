import { Mongo } from "meteor/mongo";

//Camilo A Carrillo N: Para mejorar la seguridad pueden usar Methods y llamarlos mediante Meteor.Call("Nombre del metodo", parametros);
export const Posts = new Mongo.Collection("posts");

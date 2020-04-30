export const User = new Mongo.Collection('USER');
export const Video = new Mongo.Collection('VIDEO');
export const Order = new Mongo.Collection('ORDER');
export const VideoCreateLog  = new Mongo.Collection("VIDEOCREATELOG");
export const Sub = new Mongo.Collection('SUB');
export const Admin = new Mongo.Collection('ADMIN');

Tracker.autorun(() => {
    // Meteor.subscribe('chat', { room: Session.get('currentRoom') });
    Meteor.subscribe('sub');
    Meteor.subscribe('user');
    Meteor.subscribe('video');
    Meteor.subscribe('order');
    Meteor.subscribe('videolog');
    Meteor.subscribe('admin');
  });
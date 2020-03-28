import { Meteor } from 'meteor/meteor';
import '../imports/startup/server/start'
// import ipfsClient from 'ipfs-http-client'

Meteor.startup(() => {
  // code to run on server at startup
  Future = Npm.require('fibers/future');
});

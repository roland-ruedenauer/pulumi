// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2016-2017, Pulumi Corporation.  All rights reserved.
//
'use strict';
var grpc = require('grpc');
var analyzer_pb = require('./analyzer_pb.js');
var google_protobuf_struct_pb = require('google-protobuf/google/protobuf/struct_pb.js');

function serialize_lumirpc_AnalyzeRequest(arg) {
  if (!(arg instanceof analyzer_pb.AnalyzeRequest)) {
    throw new Error('Expected argument of type lumirpc.AnalyzeRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_lumirpc_AnalyzeRequest(buffer_arg) {
  return analyzer_pb.AnalyzeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_lumirpc_AnalyzeResponse(arg) {
  if (!(arg instanceof analyzer_pb.AnalyzeResponse)) {
    throw new Error('Expected argument of type lumirpc.AnalyzeResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_lumirpc_AnalyzeResponse(buffer_arg) {
  return analyzer_pb.AnalyzeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// Analyzer is a pluggable service that checks entire projects/stacks/snapshots, and/or individual resources,
// for arbitrary issues.  These might be style, policy, correctness, security, or performance related.
var AnalyzerService = exports.AnalyzerService = {
  // Analyze analyzes a single resource object, and returns any errors that it finds.
  analyze: {
    path: '/lumirpc.Analyzer/Analyze',
    requestStream: false,
    responseStream: false,
    requestType: analyzer_pb.AnalyzeRequest,
    responseType: analyzer_pb.AnalyzeResponse,
    requestSerialize: serialize_lumirpc_AnalyzeRequest,
    requestDeserialize: deserialize_lumirpc_AnalyzeRequest,
    responseSerialize: serialize_lumirpc_AnalyzeResponse,
    responseDeserialize: deserialize_lumirpc_AnalyzeResponse,
  },
};

exports.AnalyzerClient = grpc.makeGenericClientConstructor(AnalyzerService);

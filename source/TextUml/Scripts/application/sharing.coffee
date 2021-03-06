﻿define (require) ->
  $           = require 'jquery'
  _           = require 'underscore'
  Backbone    = require 'backbone'
  events      = require './events'
  require 'signalr'
  require 'hubsproxies'

  proxy = $.connection.sharingHub
  BROADCAST_DELAY = 1000 * 1

  class Sharing
    constructor: (options) ->
      _(@).extend Backbone.Events
      @context = options.context

      proxy.client.subscribed = @onSubscribed
      proxy.client.updated = @onUpdated
      proxy.client.unsubscribed = @onUnsubscribed

    start: ->
      $.connection.hub.start().done =>
        @listenTo events, 'documentChanged', @onDocumentChanged
        @listenTo events, 'broadcastDocumentContentChange',
          _(@onBroadcast).debounce BROADCAST_DELAY

    stop: ->
      @stopListening events
      $.connection.hub.stop()

    onSubscribed: (documentId, user) =>
      @trigger 'userJoined',
        documentId: parseInt documentId, 10
        user: user

    onUpdated: (documentId, content, user) =>
      @trigger 'documentUpdated',
        documentId: parseInt documentId, 10
        content: content
        user: user

    onUnsubscribed: (documentId, user) =>
      @trigger 'userLeft',
        documentId: parseInt documentId, 10
        user: user

    onDocumentChanged: =>
      id = @documentId
      if id
        proxy.server.unsubscribe(id).done => @documentId = undefined

      if @context.isCurrentDocumentShared()
        id = @context.getCurrentDocumentId()
        proxy.server.subscribe(id).done => @documentId = id

    onBroadcast: (e) =>
      return false unless @context.canShareCurrentDocumentUpdate()
      proxy.server.update @context.getCurrentDocumentId(), e.content
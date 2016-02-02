'use strict'

React       = require 'react'
Provider    = require('react-redux').Provider

module.exports = (Component) ->

  # Create a new pure react component that wraps the passed function with a 
  # react-redux Provider.
  ComponentWithReduxProvider = (props) ->
    <Provider store=props.store>
      <Component {...props} />
    </Provider>

  # We require store as a prop by default
  defaultPropTypes = { store: React.PropTypes.object.isRequired }

  # Get proptypes fron the passed component
  componentPropTypes = Component.propTypes || {}

  # React-redux connect() function masks the wrapped components propTypes, so
  # we pull it out here.
  wrappedComponentPropTypes = Component.WrappedComponent?.propTypes || {}

  # Assign the proptypes of both the component, and wrapped component to our
  # wrapper
  ComponentWithReduxProvider.propTypes = Object.assign {}, defaultPropTypes, componentPropTypes, wrappedComponentPropTypes

  ComponentWithReduxProvider
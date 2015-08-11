submitWorkText = null

describe 'login', ->
  beforeEach (done) ->
    browser.get 'http://localhost:9999/#/'

    $('submit-work').getText().then (value) ->
      submitWorkText = value

      done()

  it 'should have batman in header', ->
    expect(submitWorkText.length).to.be.ok

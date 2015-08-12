AutoConfigFakeServer.init()

AutoConfigFakeServer.fakeServer.autoRespond = true

schemas = [
  'bower_components/appirio-tech-api-schemas/apiary/apworkmicroservice.json'
]

fixtures = []

for schema in schemas
  if window.FIXTURES[schema]
    fixtures.push window.FIXTURES[schema]
  else
    msg = 'mock data for ' + schema + ' can not be found'

    console.error msg

AutoConfigFakeServer.consume fixtures

localStorage.setItem('userJWTToken', '"yyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS50b3Bjb2Rlci1kZXYuY29tIiwiZXhwIjoxNDMzMjcxNzYwLCJ1c2VySWQiOiI0MDEzNTUxNiIsImlhdCI6MTQzMzI3MTE2MCwianRpIjoiMDZhNzVjM2EtMTQ0MC00MWE3LTk5N2YtZmFmMGVjZjFmOGM1In0.okSjl5KOmGQ6hJEoQxk4SVkFra65_Id6KUQGdAVmJNe"')
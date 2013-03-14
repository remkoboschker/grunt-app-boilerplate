define ["HelloModule"], (HelloModule) ->

  should = chai.should()
  
  describe "Hello Module test", ->
    
    beforeEach ->
      @hello = new HelloModule()

    afterEach ->
      delete @hello

    it "should return given name", ->
      name = "Andrew"
      @hello.setName name
      @hello.getName().should.equal name
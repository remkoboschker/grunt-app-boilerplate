define ["app/modules/hello/scripts/hello"], (HelloModule) ->
  
  describe "Hello Module", ->
    
    beforeEach ->
      @hello = new HelloModule()

    afterEach ->
      delete @hello

    it "should return given name", ->
      name = "Andrew"
      @hello.setName name
      # @hello.getName().should.equal name
      expect(@hello.getName()).to.equal name
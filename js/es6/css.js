import {Map, List, toJS} from 'immutable'
import {UPDATE_PROPERTY, DELETE_PROPERTY, updateProperty, deleteProperty } from "./actions"


riot.tag2('css-space', '<div class="css-space"></div>', '', '', function(opts) {
});

riot.tag2('css-indent', '<div class="css-indent"></div>', '', '', function(opts) {
});

riot.tag2('css-curly-bracket', '<div>{opts.right_or_left_bracket}</div>', '', '', function(opts) {
});




riot.tag2('css-property', '<div if="{!edit}" onclick="{toEditMode}">{opts.property}</div> <div if="{edit}"> <input class="css-editor-input" name="input" onblur="{toUnEditMode}" onchange="{toUnEditMode}" onkeypress="{keyPress}"> </div>', '', '', function(opts) {
    this.toEditMode = function(event)
    {
      this.edit = true
      this.input.value = opts.property
    }.bind(this)

    this.toUnEditMode = function(event)
    {
      this.opts.store.dispatch(updateProperty(this.opts.path, this.input.value))
      this.edit = false
    }.bind(this)

    this.keyPress = function(event)
    {
      if (event.charCode === 13) {
        this.opts.store.dispatch(updateProperty(this.opts.path, this.input.value))
        this.edit = false
      }
      else {

        return true
      }
    }.bind(this)

    this.on('updated', function(){
      if(this.edit){
        if(this.awesome === undefined ){
          var awesomParams =  {list: opts.list, minChars: 0}
          this.awesome = new Awesomplete(this.input, awesomParams);
          this.awesome.evaluate();
        }
        this.input.focus()
      }
    })

});


riot.tag2('css-value', '<div if="{!edit}" onclick="{toEditMode}">{opts.value}</div> <div if="{edit}"> <input class="css-editor-input" name="input" onblur="{toUnEditMode}" onchange="{toUnEditMode}" onkeypress="{keyPress}"> </div>', '', '', function(opts) {
    function colorElement(text, input) {
      var split = text.split(",");
      var colorHex = split[0]
      var colorName = split[split.length - 1];
      var element = document.createElement("li");
      element.innerHTML = colorHex + " " + colorName;
      element.style.backgroundColor = colorHex;
      return element;
    };

    this.toEditMode = function(event)
    {
      this.edit = true
      this.input.value = opts.value
    }.bind(this)

    this.toUnEditMode = function(event)
    {
      this.opts.store.dispatch(updateProperty(this.opts.path, this.input.value))
      this.edit = false
    }.bind(this)

    this.keyPress = function(event)
    {
      if (event.charCode === 13) {
        this.opts.store.dispatch(updateProperty(this.opts.path, this.input.value))
        this.edit = false
      }
      else {

        return true
      }
    }.bind(this)

    this.on('updated', function(){
      if(this.edit){
        if(this.awesome === undefined ){
          var awesomParams =  {list: opts.list, minChars: 0,  item: colorElement}
          this.awesome = new Awesomplete(this.input, awesomParams);
          this.awesome.evaluate();
        }
        this.input.focus()
      }
    })

});


riot.tag2('css-declaration', '<div name="line" class="css-line css-editor-declaration"> <div class="css-editor-indent"></div> <css-property class="css-editor-property" property="{opts.property}" list="{opts.property_list}" store="{opts.store}" path="{opts.path}"></css-property> <div class="css-editor-colon">:</div> <css-value class="css-editor-value" value="{opts.value}" list="{opts.value_list}" store="{opts.store}" path="{opts.path}"></css-value> <div class="css-editor-semicolon"><span>;</span></div> <button class="css-delete-button" onclick="{deleteLine}">x</button> </div>', '', '', function(opts) {

    var self = this;

    this.deleteLine = function(){
      self.line.className += " css-animated css-delete";

      setTimeout(function(){
        self.opts.store.dispatch(deleteProperty(self.opts.path, "xxxx"))
      }, 500);
    }

    this.setProperty = function(property) {
      opts.property = property;
    }

    this.setValue = function(value) {
      opts.value = value;
    }
});


riot.tag2('css-selector', '</css-selector> <css-line> <css-selector opts></css-selector> </css-line> <css-selector> <div class="css-editor-selector animated infinite flash-background" onclick="showSelector(this)"> <div>#box1</div> </div>', '', '', function(opts) {
});



riot.tag2('css-block', '<div class="css-declaration-block"> <div class="css-line"> <div class="css-editor-selector animated infinite flash-background" onclick="showSelector(this)"> <span>{opts.selector}</span> </div> <div class="css-editor-space"></div> <div class="css-editor-curly-bracket"> <span>&#123</span> </div> </div> <css-declaration each="{property, value in opts.attributes}" path="{parent.opts.path.push(⁗attributes⁗).push(property)}" store="{parent.opts.store}" property="{property}" value="{value}" property_list="{parent.opts.property_list}" value_list="{parent.opts.value_list}"> </css-declaration> <div class="css-line"> <div>&#125</div> </div> </div>', '', '', function(opts) {
});


riot.tag2('css-editor', '<css-block each="{selector, block in this.css.children}" path="{parent.opts.path.push(⁗children⁗).push( selector )}" store="{parent.opts.store}" selector="{selector}" children="{block.children}" attributes="{block.attributes}" property_list="{parent.opts.property_list}" value_list="{parent.opts.value_list}"> </css-block>', '', '', function(opts) {
    this.css = this.opts.store.getState().toJS();

    this.opts.path = List.of()

    var self = this;
    this.opts.store.subscribe(function() {
      self.css = self.opts.store.getState().toJS();
      self.update();
    })
});
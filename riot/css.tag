import {Map, List, toJS} from 'immutable'
import {UPDATE_PROPERTY, UPDATE_PROPERTY_NAME, DELETE_PROPERTY, updatePropertyName, updatePropertyValue, deleteProperty } from "./actions"
import * as css from 'css'

<css-space>
  <div class="css-space"></div>
</css-space>

<css-indent>
  <div class="css-indent"></div>
</css-indent>

<css-curly-bracket>
  <div>{ opts.right_or_left_bracket }</div>
</css-curly-bracket>



<!--
 opts.path
 opts,property
 opts,property_list: for Awesom's suggestion list
-->
<css-property>
  <div if={!edit} onClick={toEditMode}>{opts.property}</div>

  <div  if={edit}>
    <input class="css-editor-input"
           name="input"
           onBlur={toUnEditMode}
           onChange={toUnEditMode}
           onKeyPress={keyPress}>
  </div>
  <script>
    toEditMode()
    {
      this.edit = true
      this.input.value = opts.property
    }

    toUnEditMode()
    {
      this.opts.store.dispatch(updatePropertyName(this.opts.path, this.input.value))
      this.edit = false
    }

    keyPress(event)
    {
      if (event.charCode === 13) {
        this.toUnEditMode()
      }
      else {
        //http://riotjs.com/guide/#event-handlers
        //returning true calls the default onKeyPress handler
        return true
      }
    }

    this.on('updated', function(){
      if(this.edit){
        if(this.awesome === undefined ){
          var awesomParams =  {list: opts.list, minChars: 0}
          this.awesome = new Awesomplete(this.input, awesomParams);
          this.awesome.evaluate();
          this.input.addEventListener("awesomplete-selectcomplete", this.toUnEditMode);
        }
        this.input.focus()
      }
    })
  </script>
</css-property>

<!--
 opts,value
 opts,value_list:    for Awesom's suggestion list
-->
<css-value>
  <div if={!edit} onClick={toEditMode}>{opts.value}</div>

  <div if={edit}>
    <input class="css-editor-input"
           name="input"
           onBlur={toUnEditMode}
           onChange={toUnEditMode}
           onKeyPress={keyPress}>
  </div>
  <script>
    function colorElement(text, input) {
      var split = text.split(",");
      var colorHex = split[0]
      var colorName = split[split.length - 1];
      var element = document.createElement("li");
      element.innerHTML = colorHex + " " + colorName;
      element.style.backgroundColor = colorHex;
      return element;
    };

    toEditMode()
    {
      this.edit = true
      this.input.value = opts.value
    }

    toUnEditMode()
    {
      this.opts.store.dispatch(updatePropertyValue(this.opts.path, this.input.value))
      this.edit = false
    }

    keyPress(event)
    {
      if (event.charCode === 13) {
        this.toUnEditMode()
      }
      else {
        //http://riotjs.com/guide/#event-handlers
        //returning true calls the default onKeyPress handler
        return true
      }
    }


    this.on('updated', function(){
      if(this.edit){
        if(this.awesome === undefined ){
          var awesomParams =  {list: opts.list, minChars: 0,  item: colorElement}
          this.awesome = new Awesomplete(this.input, awesomParams);
          this.awesome.evaluate();
          this.input.addEventListener("awesomplete-selectcomplete", this.toUnEditMode);
        }
        this.input.focus()
      }
    })

    </script>
</css-value>

<!--
 opts.path
 opts,property
 opts,value
 opts,property_list: for Awesom's suggestion list
 opts,value_list:    for Awesom's suggestion list
-->
<css-declaration>
  <div name="line" class="css-line css-editor-declaration">
    <div           class="css-editor-indent"></div>
    <css-property  class="css-editor-property" property={ opts.property } list={ opts.property_list } store = {opts.store}  path={ opts.path.push("property") }></css-property>
    <div           class="css-editor-colon">:</div>
    <css-value     class="css-editor-value"    value={ opts.value }       list={ opts.value_list }    store = {opts.store}  path={ opts.path.push("value") }></css-value>
    <div           class="css-editor-semicolon"><span>;</span></div>
    <button        class="css-delete-button" onClick={deleteLine} >x</button>
  </div>
  <script>

    var self = this;

    this.deleteLine = function(){
      self.line.className += " css-animated css-delete";

      setTimeout(function(){
        self.opts.store.dispatch(deleteProperty(self.opts.path, "xxxx"))
      }, 200);
    }

    this.setProperty = function(property) {
      opts.property = property;
    }

    this.setValue = function(value) {
      opts.value = value;
    }
  </script>
</css-declaration>


<css-selector>

</css-selector>


<css-line>
  <!-- Polymorphism: CSS line is either of them below -->
  <css-selector opts=></css-selector>
  <script>
  </script>
</css-line>

<css-selector>
  <div class="css-editor-selector animated infinite flash-background" onclick="showSelector(this)">
    <div>#box1</div>
  </div>
</css-selector>


<!--
 opts.path
 opts,block
 opts,property_list: for Awesom's suggestion list
 opts,value_list:    for Awesom's suggestion list
-->
<css-block>
  <div class="css-declaration-block">
    <div class="css-line">
      <div class="css-editor-selector animated infinite flash-background" onclick="showSelector(this)">
        <span>{ opts.block.selectors }</span>
      </div>
      <div class="css-editor-space"></div>
      <div class="css-editor-curly-bracket">
        <span>&#123</span>
      </div>
    </div>
    <css-declaration
            each ={ declaration, index in opts.block.declarations }
              path          ={ parent.opts.path.push("declarations").push(index)}
              store         ={ parent.opts.store }
              property      ={ declaration.property }
              value         ={ declaration.value }
              property_list ={ parent.opts.property_list }
              value_list    ={ parent.opts.value_list }
    >
    </css-declaration>
    <div class="css-line">
      <div>&#125</div>
    </div>
  </div>

  <script>
  </script>
</css-block>

<!--
 opts,css: CSS2JSON's JSON structure
 opts,property_list: for Awesom's suggestion list
 opts,value_list:    for Awesom's suggestion list
-->
<css-editor>
  <css-block each={ block, i in this.css.rules  }
               path          ={ parent.opts.path.push("rules").push( i ) }
               index         ={ i }
               block         ={ block }
               store         ={ parent.opts.store }
               property_list ={ parent.opts.property_list }
               value_list    ={ parent.opts.value_list }
          >
  </css-block>

  <script>
    this.css = this.opts.store.getState().toJS();

    this.opts.path = List.of()

    var self = this;
    this.opts.store.subscribe(function() {
      self.css = self.opts.store.getState().toJS();
      self.update();
    })
  </script>
</css-editor>
import { CKEditor } from '@ckeditor/ckeditor5-react'
import  ClassicEditor  from '@ckeditor/ckeditor5-build-classic';
import styled from "styled-components";
import { useEffect, useState } from 'react';


// console.log(ClassicEditor.builtinPlugins.map( plugin => plugin.pluginName ));

const editorConfiguration = {
  toolbar: ['heading', '|', 'bold', 'italic', "blockQuote", '|', 'bulletedList', 'numberedList', 'Indent', "Table", "TableToolbar",   'undo', 'redo', ],
};

function CkEditor(props) {
  const [ customData, setCustomData ] = useState("");
  const [ Nyll, setNyll ] = useState(false);

  useEffect(()=>{
      if(props.data){ setCustomData(props.data)}
  },[props.data])
    
  return (
    <Container className="CkEditor">
      {props.title&&<p className="title">{props.title} <span className="additionTitle"> {props.targeted?`( ${props.targeted} )`:``}</span></p>} 
      <div className={props.height?Nyll||props.nulls? `redCustom`:`activeCustom`:Nyll||props.nulls? `red`:`active`}>
        <CKEditor
              height={100}
              editor={ ClassicEditor }
              // config={ editorConfiguration }
              data={customData}
              onReady={ editor => {
                  // You can store the "editor" and use when it is needed.
                  console.log( 'Editor is ready to use!', editor );
              } }
              onChange={ ( event, editor ) => {
                  const data = editor.getData();
                  if(props.setParentData){
                    props.setParentData(prev=>[ ...prev, ...prev.filter(item=>{
                        if(item.code === props.selected.code){
                           item.body = data
                        }
                    })])
                  }else{
                    props.setData(data);
                  }
                  // console.log( { event, editor, data } );
              }}
              onBlur={ ( event, editor ) => {
                  console.log( 'Blur.', editor );
                  const data = editor.getData();
                  if(data === ""){ setNyll(true) }else { setNyll(false) }
              }}
              onFocus={ ( event, editor ) => {
                  // console.log( 'Focus.', editor );
                  if(props.element){
                    props.setSelected(props.element);
                  }
                  setNyll(false);
              }}
          />
      </div>
    </Container>
  );
}

export default CkEditor;

const Container = styled.div`
  .title{
    font-weight:500;
    .additionTitle{
      margin-left:10px;
      font-weight:400;
    }
  }
  .active{
    .ck-editor{
      .ck-editor__main{
        .ck-editor__editable_inline{
          min-height:30rem !important;
          // border:none;
        }
      }
    }
  }
  .activeCustom{
    .ck-editor{
      .ck-editor__main{
        .ck-editor__editable_inline{
          min-height:18rem !important;
          // border:none;
        }
      }
    }
  }
  .red{
    .ck-editor{
      .ck-editor__main{
        .ck-editor__editable_inline{
          border:1px solid rgb(255,20,20);
          min-height:30rem !important;
        }
      }
    }
  }
  .redCustom{
    .ck-editor{
      .ck-editor__main{
        .ck-editor__editable_inline{
          border:1px solid rgb(255,20,20);
          min-height:18rem !important;
        }
      }
    }
  }
  .ck.ck-reset_all, .ck.ck-reset_all * {
    text-align: right;
  }
  .ck-icon{
      opacity: 0.85;
      font-size: .72em !important;
  }
`

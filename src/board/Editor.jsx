import { useSelector, useDispatch } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import { editorActions } from '../_store/index.js'; // 경로에 주의하세요, editorActions의 정확한 위치를 임포트해야 합니다.
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export function MyEditor() {
    const dispatch = useDispatch();
    const editorState = useSelector(x => x.editor.editorState );

    const handleEditorStateChange = (newEditorState) => {
        dispatch(editorActions.setEditorState(newEditorState));
    };

    const handleSubmit = () => {
        // 여기서 에디터 상태를 처리합니다. 예를 들어 서버로 전송할 수 있습니다.
        console.log('Submitting content:', editorState.getCurrentContent().getPlainText());
        // `editorState.getCurrentContent()`를 사용하여 다양한 형태로 데이터를 추출할 수 있습니다.
    };

    return (
        <div>
            <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorStateChange}
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}
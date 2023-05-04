import './App.css';
import { PdfList } from './PdfList/PdfList';
import UploadModal from './UploadModal/UploadModal';

function App() {
  return (
    <div className="container">
        <UploadModal/>
        <PdfList/>
    </div>
  );
}

export default App;

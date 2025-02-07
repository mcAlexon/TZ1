import { SeminarList } from './components/seminarList/component';
import './index.css';


export const App = ()=>{
  // const [seminars, setSeminars] = useState([]); // Данные семинаров
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [currentSeminar, setCurrentSeminar] = useState(null);
    return(
      <>
        
        <SeminarList/>
      </>
    );

};
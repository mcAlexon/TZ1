import classname from "classname";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import { deleteSeminar } from "../../api"; 




export const SeminarItem = ({seminar, onEdit, onConfirm }) =>{
  const handleDelete = async () => {
    const isConfirmed = window.confirm("Вы уверены, что хотите удалить этот семинар?");
    if (!isConfirmed) return;
  
    try {
      await deleteSeminar(seminar.id); //Функция из api альтернатива fetch
      onConfirm(seminar.id); 
    } catch (error) {
      console.error("Ошибка удаления:", error);
    }
  };
    return (
                <div className={classname(styles.seminarCard)}>
                    <img src={seminar.photo} alt={seminar.title} width='200'/>
                    <h3>{seminar.title}</h3>
                    <p>{seminar.description}</p>
                    <p>
                    📅 {seminar.date} ⏰ {seminar.time}
                    </p>
                    <div className={classname(styles.buttons)}>
                      <button onClick={() => onEdit(seminar)} className={classname(styles.buttonEdit)}>Редактировать</button>
                      <button onClick={() => handleDelete()} className={classname(styles.buttonDelete)}>Удалить</button>
                    </div>
                </div>
    )
};
SeminarItem.propTypes = {
    seminar: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
    }).isRequired,
    onEdit: PropTypes.func.isRequired, 
    onConfirm: PropTypes.func.isRequired
  };
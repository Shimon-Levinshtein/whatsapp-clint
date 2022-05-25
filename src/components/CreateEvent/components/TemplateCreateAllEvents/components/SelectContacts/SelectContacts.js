import React, { useEffect, useState } from 'react';
import styles from "./SelectContacts.module.scss";
import { connect } from 'react-redux';
import ButtonClose from '../../../../../templates/ButtonClose/ButtonClose';


const SelectContacts = props => {

  const [selectedAllContacts, setSelectedAllContacts] = useState(false);

  useEffect(() => {
  }, [selectedAllContacts]);
  
  const onChangeSelectAll = () => {
    if (!selectedAllContacts) {
      const contactsList = [];
      props.whatsappData.contacts.forEach(item => {
        if (item.isUser) {
          contactsList.push({ name: item.name ? item.name : 'Not a contact', number: item.number });
        }
      })
      props.setContactsList(contactsList);
      setSelectedAllContacts(true);
    } else {
      props.setContactsList([]);
      setSelectedAllContacts(false);
    };
  };


  const handleSelectContact = (contact, yasOrNo) => {
    const newContactsList = [...props.contactsList];
    if (!yasOrNo) {
      newContactsList.push({ name: contact.name ? contact.name : 'Not a contact', number: contact.number });
    } else {
      let index;
      props.contactsList.forEach((item, indexS) => {
        if (item.number === contact.number) {
          index = indexS
        };
      });
      newContactsList.splice(index, 1);
    };
    props.setContactsList(newContactsList);
  };

  return (
    <div className={styles.continer}>
      <div className={styles.continer_box}>
        <ButtonClose close={props.setOpenContacts} />
        <div className={styles.select_all_box}>
          <input checked={selectedAllContacts} type="checkbox" onChange={() => onChangeSelectAll()} />
          <div className={styles.select_all_box_left}>
            Select All ({props.contactsList.length})
          </div>
        </div>
        <div className={styles.contacts_list}>
          {props.whatsappData.contacts.map((item, index) => {
            if (item.isUser) {
              return (
                <div key={index}>
                  <div className={styles.contacts_list_item}>
                    <input
                      checked={props.contactsList.some(a => a.number === item.number)}
                      onChange={() => handleSelectContact(item, props.contactsList.some(a => a.number === item.number))}
                      type="checkbox" />
                    <div className={styles.contacts_list_item_name}>{item.name ? item.name : 'Not a contact'} </div>
                    <div className={styles.contacts_list_item_number}>{item.number}</div>
                  </div>
                  <hr />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = state => {
  return {
    whatsappData: state.whatsappData,
  }
}
export default connect(mapStateToProps, {})(SelectContacts);
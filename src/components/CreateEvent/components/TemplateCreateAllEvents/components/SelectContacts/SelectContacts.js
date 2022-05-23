import React, { useEffect, useState } from 'react';
import styles from "./SelectContacts.module.scss";
import { connect } from 'react-redux';
import ButtonClose from '../../../../../templates/ButtonClose/ButtonClose';


const SelectContacts = props => {
  // console.log(props.whatsappData.contacts);
  const [selectedAllContacts, setSelectedAllContacts] = useState(false);
  // contactsList, setContactsList
  console.log(selectedAllContacts);
  useEffect(() => {
    if (selectedAllContacts) {
      const contactsList = [];
      props.whatsappData.contacts.forEach(item => {
        if (item.isUser) {
          contactsList.push({ name: item.name ? item.name : 'Not a contact', number: item.number });
        }
      })
      props.setContactsList(contactsList);
    } else {
      props.setContactsList([]);
    };
  }, [selectedAllContacts]);

  const handleSelectContact = (contact, yasOrNo) => {
    console.log('handleSelectContact', contact, yasOrNo);
    const newContactsList = [...props.contactsList];
    if (!yasOrNo) {
      newContactsList.push({ name: contact.name ? contact.name : 'Not a contact', number: contact.number });
    } else {
      newContactsList.splice(newContactsList.indexOf({ name: contact.name ? contact.name : 'Not a contact', number: contact.number }), 1);
    };
    props.setContactsList(newContactsList);
  };

  return (
    <div className={styles.continer}>
      <div className={styles.continer_box}>
        <ButtonClose close={props.setOpenContacts} />
        <div className={styles.select_all_box}>
          <input checked={selectedAllContacts} type="checkbox" onChange={() => setSelectedAllContacts(!selectedAllContacts)} />
          <div className={styles.select_all_box_left}>
            Select All
          </div>
        </div>
        <div className={styles.contacts_list}>
          {props.whatsappData.contacts.map((item, index) => {
            if (item.isUser) {
              return (
                <>
                  <div className={styles.contacts_list_item} key={index}>
                    <input
                      checked={props.contactsList.some(a => a.number === item.number)}
                      onChange={() => handleSelectContact(item, props.contactsList.some(a => a.number === item.number))}
                      type="checkbox" />
                    <div className={styles.contacts_list_item_name}>{item.name ? item.name : 'Not a contact'} </div>
                    <div className={styles.contacts_list_item_number}>{item.number}</div>
                  </div>
                  <hr />
                </>
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
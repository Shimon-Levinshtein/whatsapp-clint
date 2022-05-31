import React, { useEffect, useState } from 'react';
import styles from "./SelectGroup.module.scss";
import { connect } from 'react-redux';
import ButtonClose from '../../../../../templates/ButtonClose/ButtonClose';


const SelectGroup = props => {

  const [selectedAllContacts, setSelectedAllContacts] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
  }, [selectedAllContacts]);

  const onChangeSelectAll = () => {
    if (!selectedAllContacts) {
      const contactsList = [];
      props.whatsappData.contacts.forEach(item => {
        if (item.isGroup) {
          contactsList.push({ name: item.name ? item.name : 'Not a contact', number: item.number });
        }
      })
      props.setGroupList(contactsList);
      setSelectedAllContacts(true);
    } else {
      props.setGroupList([]);
      setSelectedAllContacts(false);
    };
  };


  const handleSelectContact = (contact, yasOrNo) => {
    const newContactsList = [...props.groupList];
    if (!yasOrNo) {
      newContactsList.push({ name: contact.name, number: contact.number });
    } else {
      let index;
      props.groupList.forEach((item, indexS) => {
        if (item.name === contact.name) {
          index = indexS
        };
      });
      newContactsList.splice(index, 1);
    };
    props.setGroupList(newContactsList);
  };
  return (
    <div className={styles.continer}>
      <div className={styles.continer_box}>
        <ButtonClose close={props.setOpenGroup} />
        <div className={styles.select_all_box}>
          <input checked={selectedAllContacts} type="checkbox" onChange={() => onChangeSelectAll()} />
          <div className={styles.select_all_box_left}>
            Select All ({props.groupList.length})
          </div>
        </div>
        <div className={styles.search_input_div}>
          <input value={search} onChange={e => setSearch(e.target.value)} className={styles.search_input} type='text' placeholder="Search..." name="search" />
        </div>
        <div className={styles.contacts_list}>
          {props.whatsappData.contacts
          .filter(i => {
            if (!i.isGroup) {
              return false;
            }
            if (!search) {
              return true;
            }
            if (i.name && i.number) {
              return i.name.toLowerCase().includes(search.toLowerCase()) || i.number.toLowerCase().includes(search.toLowerCase());
            } else {
              if (i.name) {
                return i.name.toLowerCase().includes(search.toLowerCase());
              }
              if (i.number) {
                return i.number.toLowerCase().includes(search.toLowerCase());
              }
              return false;
            }
          })
          .map((item, index) => {
            if (item.isGroup) {
              return (
                <div key={index}>
                  <div className={styles.contacts_list_item}>
                    <input
                      checked={props.groupList.some(a => a.name === item.name)}
                      onChange={() => handleSelectContact(item, props.groupList.some(a => a.name === item.name))}
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
export default connect(mapStateToProps, {})(SelectGroup);
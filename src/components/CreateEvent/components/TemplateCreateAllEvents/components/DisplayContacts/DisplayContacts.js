import React from 'react';
import styles from "./DisplayContacts.module.scss";
import { connect } from 'react-redux';


const DisplayContacts = props => {
  return (
    <div className={styles.continer}>
      <div className={styles.contacts_list}>
        {!props.contactsList.length && <div className={styles.empty_list}> Nothing was selected!</div>}
        {props.contactsList.map((item, index) => {
          return (
            <div key={index}>
              <div className={styles.contacts_list_item}>
                <div className={styles.contacts_list_item_name}>{item.name ? item.name : 'Not a contact'} </div>
                <div className={styles.contacts_list_item_number}>{item.number}</div>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};


const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps, {})(DisplayContacts);
import React, { useEffect, useState } from 'react';
import styles from "./ReplyToInComingMessage.module.scss";
import { connect } from 'react-redux';
import CreateComingMessage from './CreateComingMessage/CreateComingMessage';
import { BiMessageRoundedAdd, BiMessageRoundedDetail, BiMessageRoundedDots, BiMessageRoundedCheck } from "react-icons/bi";
import { GrEdit } from "react-icons/gr";

const ReplyToInComingMessage = ({ replyToInComingMessage, setReplyToInComingMessage }) => {

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});
  console.log(replyToInComingMessage);
  const editCondition = (index, data) => {
    data.index = index;
    setEditData(data);
    setIsEdit(true);
    setIsCreateOpen(true);
  };
  useEffect(() => {
    if (isEdit && !isCreateOpen) {
      setIsEdit(false);
    }
  }, [isCreateOpen]);

  return (
    <div className={styles.continer}>
      <div className={styles.box}>
        <div className={styles.title}>Reply to incoming message list</div>
        <div className={styles.list}>
          {replyToInComingMessage.map((item, index) => (
            <div className={styles.list__item} key={index}>
              <div className={styles.list_item_box}>
                {item.typeCondition === 'all' && <BiMessageRoundedCheck />}
                {item.typeCondition === 'containing' && <BiMessageRoundedDots />}
                {item.typeCondition === 'exact' && <BiMessageRoundedDetail />}
                <div className={styles.list__item__content__text}>
                  {item.sendMessage}
                </div>
                <div onClick={() => editCondition(index, item)} className={styles.edit_item}>
                  <GrEdit />
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
      {isCreateOpen &&
        <CreateComingMessage
          replyToInComingMessage={replyToInComingMessage}
          setReplyToInComingMessage={setReplyToInComingMessage}
          setIsCreateOpen={setIsCreateOpen}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          editData={editData}
        />
      }
      <div onClick={() => setIsCreateOpen(true)} className={styles.add_bottom}>Create a new condition<BiMessageRoundedAdd /></div>
    </div>
  );
};


const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps, {})(ReplyToInComingMessage);
import Search from '../components/phishForm/PhishForm';
import Header from '../components/header/Header';
import styles from '../styles/Home.module.css';
// import {getUsers, setUsers} from "../firebase/users"

export default function Home() {

    // getUsers();
    // setUsers("trevor")

import axios from 'axios';

export default function Home() {
  const handleSendEmail = async (emailProperties) => {
    // eslint-disable-next-line no-unused-vars
    const res = await axios.post('/api/hello', {
      ...emailProperties,
      replyTo: 'phishedapp@gmail.com',
    });
  };


  return (
    <>
      <Header></Header>
      <div className={styles.container}>
        <h1> Welcome to phished!</h1>
        <Search onSendEmail={handleSendEmail} />
      </div>
    </>
  );
}

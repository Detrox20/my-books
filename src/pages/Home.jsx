import React, { useEffect } from 'react';
import withAuth from '../hocs/withAuth';
import axios from 'axios';
import { Row, Col } from 'antd';
import styles from '../styles/Home.module.scss';

function Home({ token }) {
  const [state, setState] = React.useState({
    books: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    async function request() {
      try {
        const response = await axios.get('https://api.marktube.tv/v1/book', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const books = response.data;
        setState({ books, loading: false });
      } catch (error) {
        setState({ loading: false, error });
      }
    }

    request();
  });

  return (
    <Row className={styles['wrapper-container']}>
      <Col span={24}>
        <Row className={styles.header}>
          <h1>List of My Books</h1>
        </Row>
        <Row className={styles['books-container']}>
          <Col span={6} className={styles.side}></Col>
          <Col span={12} className={styles.center}>
            <ul>
              {state.books.map((book) => (
                <li key={book.bookId}>
                  <div className={styles.image}></div>
                  <div className={styles.content}>
                    <p>제목: {book.title}</p>
                    <p>저자: {book.author}</p>
                    <p>책 소개: {book.message}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Col>
          <Col span={6} className={styles.side}></Col>
        </Row>
      </Col>
    </Row>
  );
}

// class Home extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       books: [],
//       loading: false,
//       error: null,
//     };
//   }

//   render() {
//     console.log(this.state);
//     return (
//       <Row className={styles['wrapper-container']}>
//         <Col span={24}>
//           <Row className={styles.header}>
//             <h1>List of My Books</h1>
//           </Row>
//           <Row className={styles['books-container']}>
//             {/* <Col span={6} className={styles.side}></Col> */}
//             <Col span={12} className={styles.center}>
//               <ul>
//                 {this.state.books.map((book) => (
//                   <li key={book.bookId}>
//                     <div className={styles.image}></div>
//                     <div className={styles.content}>
//                       <p>제목: {book.title}</p>
//                       <p>저자: {book.author}</p>
//                       <p>책 소개: {book.message}</p>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </Col>
//             {/* <Col span={6} className={styles.side}></Col> */}
//           </Row>
//         </Col>
//       </Row>
//     );
//   }

//   async componentDidMount() {
//     this.setState({
//       loading: true,
//       error: null,
//     });

//     try {
//       const response = await axios.get('https://api.marktube.tv/v1/book', {
//         headers: {
//           Authorization: `Bearer ${this.props.token}`,
//         },
//       });
//       const books = response.data;
//       this.setState({ books, loading: false });
//     } catch (error) {
//       this.setState({ loading: false, error });
//     }
//   }
// }

export default withAuth(Home, true);

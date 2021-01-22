import styles from './App.module.css';
import { Itunes } from './itunes';

function App({ title }: { title: string }) {
    return (
          <div className={styles['App']}>
            <header className={styles['App-header']}>
              <Itunes/>
            </header>
          </div>
        );
}

export default App;

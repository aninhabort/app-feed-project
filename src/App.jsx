import { Post } from "./Post"
import { Header } from "./components/Header"

import styles from './App.module.css'

import './global.css'
import { Sidebar } from "./components/Sidebar"

function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />

        <main>
          <Post
            author="Ana Carolina"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique fugit numquam eos a tempora unde dolorum illum, mollitia eaque? Molestiae corporis vel quibusdam autem ab ex qui facilis fuga illo." />
          <Post
            author="Pedro"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur rem hic veritatis doloremque consequatur nemo aspernatur, repudiandae nam neque odio qui nesciunt tempora quos fugit animi cumque nisi debitis odit." />
        </main>
      </div>
    </div>
  )
}

export default App

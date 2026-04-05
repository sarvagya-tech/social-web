import React from 'react'
import NavBar from '../components/NavBar'
import Header from '../components/Header'
import About from '../components/About'
import BlogList from '../components/blogList'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <NavBar />
      <Header />
      <About />
      <BlogList />
      <Newsletter />
      <Footer />
    </>
  )
}

export default Home
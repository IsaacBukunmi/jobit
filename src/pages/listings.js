import React from 'react'
import Layout from '../components/layout'
import ListingResults from '../components/listing-results'
import ListingSearch from '../components/listing-search'

const Listings = () => {
  return (
    <Layout>
        <ListingSearch />
        <ListingResults />
    </Layout>
  )
}

export default Listings
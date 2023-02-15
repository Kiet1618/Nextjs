import React, { useState } from 'react';

export default function App() {
  return (
    <div>This is Menu 1</div>
  )
}

export async function getServerSideProps({ req }) {
  const headers = req ? req.headers : {};
  return { props: { headers } }
}
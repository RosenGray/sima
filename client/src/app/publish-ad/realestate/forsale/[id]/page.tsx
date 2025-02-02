/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck commen
import { notFound } from "next/navigation";
import { FC } from "react"



export async function generateMetadata({params}){
  if(!params.id){
    return notFound();
  }
  return {
    title:params.id
  }
} 



interface ForSageItemPage {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const ForSaleItemPage:FC<ForSageItemPage> =  ({params,searchParams}) => {
  console.log(params)
  console.log(searchParams)
  const id = '';//(await params).id
  console.log(id)
  return <h1>ForSaleItemPage {params.id}</h1>
}

export default ForSaleItemPage

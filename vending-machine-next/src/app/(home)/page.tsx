import RootContainer from '@/template/RootContainer'
import { headers } from 'next/headers'
import SideContainer from './template/SideContainer'
import VendingMachine from './template/VendingMachine'

export default async function Home() {
    const headersList = await headers()
    const host = headersList.get('host')
    const protocol = headersList.get('x-forwarded-proto') || 'http'
    const currentUrl = `${protocol}://${host}`

    const response = await fetch(`${currentUrl}/api/item`, { method: 'GET', cache: 'no-store' })

    if (!response.ok) return <>api 호출 에러</>

    const { data: items } = await response.json()

    return (
        <RootContainer>
            <VendingMachine items={items} />
            <SideContainer />
        </RootContainer>
    )
}

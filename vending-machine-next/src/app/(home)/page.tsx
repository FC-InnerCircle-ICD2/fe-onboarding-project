import RootContainer from '@/template/RootContainer'
import SideContainer from './template/SideContainer'
import VendingMachine from './template/VendingMachine'

export default function Home() {
    return (
        <RootContainer>
            <VendingMachine />
            <SideContainer />
        </RootContainer>
    )
}

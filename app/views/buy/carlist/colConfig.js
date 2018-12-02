
import CarAvatar from './tablegrid/CarAvatar';
import Km from './tablegrid/Km';
import Buydate from './tablegrid/Buydate';
import License from './tablegrid/License';
export default [
    {
        title: '形象照',
        key: 'avatar',
        render(h, {row}){
            return h(CarAvatar, {
                props : {
                    row
                }
            })
        },
        width : 150

    },
    {
        title: 'Id',
        key: 'id',
        sortable : "custom",
        sortType : "asc"
    },
    {
        title: '颜色',
        key: 'color'
    },
    {
        title: '品牌',
        key: 'brand'
    },
    {
        title: '车系',
        key: 'series'
    },
    {
        title: '售价',
        key: 'price',
        sortable: "custom"
    },
    {
        title: '公里数',
        key: 'km',
        sortable: "custom",
        render(h, {row}){
            return h(Km, {
                props : {
                    km : row.km
                }
            })
        }
    },
    {
        title: '购买日期',
        key: 'buydate',
        render(h, {row}){
            return h(Buydate, {
                props : {
                    buydate : row.buydate
                }
            })
        }
    },
    {
        title: '发动机',
        key: 'engine'
    },
    {
        title: '燃料',
        key: 'fuel'
    },
    {
        title: '排放',
        key: 'exhaust'
    },
    {
        title: '变速箱',
        key: 'gearbox'
    },
    {
        title: '是否上牌',
        key: 'license',
        render(h, {row}){
            return h(License, {
                props : {
                    license : row.license 
                }
            })
        }
    }
]
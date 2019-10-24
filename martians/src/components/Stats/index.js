import React from 'react'
import Chart from 'react-svg-piechart'
import styles from './styles.module.css'
import { countPercents } from './logic.js'
import Icon from './icon.js'

const Stat = props => (
  <div className={ styles.stat } title={ props.type }>
    <div className={ styles.wrapper }>
      <div className={ styles.chart }>
        <Chart
          className={ styles.chart }
          strokeWidth={ 0 }
          data={[{
            value: props.percents,
            color: '#000'
          }, {
            value: 100 - props.percents,
            color: '#cdcccc'
          }]}
        />
      </div>
      <div className={ styles.icon }>
        <Icon type={ props.type } />
      </div>
    </div>
    <span className={ styles.title }>
      { props.value }
    </span>
  </div>
)

export default props => props.data ? (
  <div className={ styles.root }>
    <Stat
      type="views"
      value={ (props.data.today.views - props.data.best.views) > 0 ?
        '+' + (props.data.today.views - props.data.best.views) :
        '+0'
      }
      percents={ countPercents(props.data.today.views, props.data.best.views) }
    />
    <Stat
      type="reposts"
      value={ props.data.today.reposts }
      percents={ countPercents(props.data.today.reposts, props.data.best.reposts) }
    />
    <Stat
      type="likes"
      value={ props.data.today.likes }
      percents={ countPercents(props.data.today.likes, props.data.best.likes) }
    />
    <Stat
      type="comments"
      value={ props.data.today.comments }
      percents={ countPercents(props.data.today.comments, props.data.best.comments) }
    />
  </div>
) : <></>

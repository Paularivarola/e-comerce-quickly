import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import { BsFillCaretRightFill } from 'react-icons/bs'
import { FiArrowRightCircle } from 'react-icons/fi'
import styles from '../styles/profile.module.css'

const NavItems = (props) => {
  const { item, index } = props
  const [expanded, setExpanded] = useState(Boolean(item.desplegable))
  let path =
    window.location.pathname.split('/')[
      window.location.pathname.split('/').length - 1
    ]
  return (
    <Accordion expanded={expanded}>
      <AccordionSummary
        aria-controls={`panel${index}bh-content`}
        id={`panel${index}bh-header`}
      >
        <div className={styles.boxItem}>
          <NavLink
            exact
            to={`/${item.page}/${item.comp}`}
            className={
              (path === item.comp ||
                item?.desplegable?.some((i) => i.comp === path)) &&
              styles.active
            }
          >
            {item.name}
            <BsFillCaretRightFill
              className={styles.icon}
              style={{ color: '#fe6849', fontSize: '1em' }}
            />
          </NavLink>
        </div>
      </AccordionSummary>
      {item.desplegable && (
        <AccordionDetails>
          {item.desplegable.map((desp) => (
            <div key={desp.comp}>
              {/* <FiArrowRightCircle
                className={styles.icon}
                style={{
                  color: '#fe6849',
                  fontSize: '1.8em',
                  marginRight: '5%',
                }}
              /> */}
              <NavLink
                exact
                to={`/${item.page}/${desp.comp}`}
                className={path === desp.comp && styles.active}
              >
                {desp.name}
              </NavLink>
            </div>
          ))}
        </AccordionDetails>
      )}
    </Accordion>
  )
}

export default NavItems

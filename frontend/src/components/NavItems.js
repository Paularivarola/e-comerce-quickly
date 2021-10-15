import React from 'react'
import { NavLink } from 'react-router-dom'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import { BsFillCaretRightFill } from 'react-icons/bs'
import styles from '../styles/profile.module.css'

const NavItems = (props) => {
  const { item, index } = props
  let path =
    window.location.pathname.split('/')[
    window.location.pathname.split('/').length - 1
    ]
  return (
    <Accordion expanded={Boolean(item.desplegable)}>
      <AccordionSummary
        aria-controls={`panel${index}bh-content`}
        id={`panel${index}bh-header`}
      >
        <div className={styles.boxItem}>
          <NavLink
            exact
            to={`/${item.page}/${item.comp}`}
            className={
              path === item.comp ||
                item?.desplegable?.some((i) => i.comp === path)
                ? styles.active
                : undefined
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
                className={path === desp.comp ? styles.active : undefined}
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

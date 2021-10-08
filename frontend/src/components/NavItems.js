import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import { BsFillCaretRightFill } from 'react-icons/bs'
import { FiArrowRightCircle } from "react-icons/fi"
import styles from '../styles/profile.module.css'

const NavItems = (props) => {
  const { item, index, setSubComp, selectComponent } = props
  const [expanded, setExpanded] = useState('')
  return (
    <Accordion expanded={expanded} onChange={() => item.desplegable && setExpanded(!expanded)}>
      <AccordionSummary aria-controls={`panel${index}bh-content`} id={`panel${index}bh-header`}>
        <Typography sx={{ width: '100%', flexShrink: 0 }}>
          <div className={styles.boxItem}>
            <NavLink
              to={`/profile/${item.comp}`}
              onClick={() => {
                selectComponent(item.comp)
              }}
            >
              {item.name}
              <BsFillCaretRightFill className={styles.icon} style={{ color: '#fe6849', fontSize: '1em' }} />
            </NavLink>
          </div>
        </Typography>
      </AccordionSummary>
      {item.desplegable && (
        <AccordionDetails>
          <Typography>
            {item.desplegable.map((desp) => (
              <div className={styles.boxAcordeon}>
                <FiArrowRightCircle className={styles.icon} style={{ color: '#fe6849', fontSize: '1.8em', marginRight: '5%' }} />
                <NavLink
                  to={`/profile/${item.comp}/${desp.comp}`}
                  onClick={() => {
                    setSubComp(desp.comp)
                  }}
                >
                  {desp.name}
                </NavLink>
              </div>
            ))}
          </Typography>
        </AccordionDetails>
      )}
    </Accordion>
  )
}

export default NavItems

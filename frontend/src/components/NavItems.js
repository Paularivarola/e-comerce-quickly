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
  return (
    <Accordion expanded={expanded}>
      <AccordionSummary aria-controls={`panel${index}bh-content`} id={`panel${index}bh-header`}>
        <Typography sx={{ width: '100%', flexShrink: 0 }}>
          <div className={styles.boxItem}>
            <NavLink to={`/profile/${item.comp}`}>
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
              <span key={desp.comp} className={styles.boxAcordeon}>
                <FiArrowRightCircle
                  className={styles.icon}
                  style={{ color: '#fe6849', fontSize: '1.8em', marginRight: '5%' }}
                />
                <NavLink to={`/profile/${desp.comp}`}>{desp.name}</NavLink>
              </span>
            ))}
          </Typography>
        </AccordionDetails>
      )}
    </Accordion>
  )
}

export default NavItems

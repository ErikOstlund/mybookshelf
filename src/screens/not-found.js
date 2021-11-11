/** @jsx jsx */
import { jsx } from '@emotion/core'

function NotFoundScreen() {
  return (
    <div
      css={{
        height: '100%',
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div>Sorry... nothing here.</div>
    </div>
  )
}

export { NotFoundScreen }

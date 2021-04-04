import React from 'react'

import dva from './utils/dva'
import AppNavigation, { routerMiddleware, routerReducer } from '../app/util/AppNavigation'
import appModel from './models/app'

const app = dva({
    initialState: {},
    models: [appModel],
    extraReducers: { router: routerReducer },
    onAction: [routerMiddleware],
    onError(e) {
        console.log('onError', e)
    },
})

export default app.start(<AppNavigation/>)

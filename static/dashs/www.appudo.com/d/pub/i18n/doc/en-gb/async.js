addI18n({
    info: {
        head:'Asynchronous Processing',
        txt1:'To make life as easy as possible for programmers and rule out error sources from complicated models, we have decided to use a specialized model. It is based on virtual processes called Runs which are stopped when a result form one or more asynchronous functions are requested.',
        txt2:'The return type of an asynchronous function is always AsyncValue<T>, although T is the real return type.',
        txt3:'The return value can be requested with the special operator <!. In contrast to other models it is clear at any time where the execution of visible parts of the program will happen.',
        txt4:'While a Run is waiting for the result of an asynchronous function, other Runs can still execute in parallel. Since Runs are isolated and self contained units this is a simple and easy to understand model without surprises. With the operator <? it is however possible to call a function event based as soon as a return value is ready.',
        txt5:'This model is better suited than for example a language integrated async/await, since the overall system is based on the design of isolated service oriented units. For instance the HTTP-stack is a simple isolated service that would not profit from an async/await style model. It\'s coupling is mostly based on data, independent of process and program structure and deliberately without language dependencies.'
    }
});
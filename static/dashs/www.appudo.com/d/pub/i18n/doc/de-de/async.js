addI18n({
    info: {
        head:'Asynchrone Abarbeitung',
        txt1:'Um die Handhabung für Entwickler so einfach wie möglich zu gestalten und die Fehlerquellen komplizierter Modelle zu vermeiden, haben wir uns für ein spezielles Modell entschieden. Es basiert auf virtuellen Prozessen, den sogenannten Runs, welche gestoppt werden sobald das Ergebnis einer order mehrerer asynchroner Functionen angefordert wird.',
        txt2:'Der Rückgabetyp asynchroner Funtionen ist immer AsyncValue<T>, wobei T dem eigentlichen Rückgabewert entspricht.',
        txt3:'Der Rückgabewert kann etwa mit dem Operator <! angefordert werden. In Gegensatz zu anderen Modellen ist hier jederzeit klar, wo sich die Ausführung des sichtbaren Teils eines Programmes befindet',
        txt4:'Während ein Run auf die Ergebnisse einer asynchronen Funktion wartet können andere Runs weiterhin nebenläufig ausgeführt werden. Da Runs voneinander unabhängige eigenständige Einheiten sind, ergibt sich ein einfach verständliches Modell ohne Überraschungen. Mit dem Operator <? ist es allerdings auch möglich ereignisbasiert eine Function auszuführen, sobald ein Ergebnis verfügbar ist.',
        txt5:'Dieses Modell ist besser geeignet als etwa ein in die Sprache integriertes async/await, da das Gesamtsystem auf voneinander getrennten Einheiten nach einem servicebasierten Ansatz gestaltet ist. So befindet sich etwa der HTTP-Stack als Service in einer getrennten Einheit, die sehr einfach gestaltet ist und von einem async/await-Ansatz nicht profitieren würde. Die Kopplung erfolgt hauptsächlich datenbasiert, Prozess- und Programmunabhängig und ist bewusst nicht auf eine Sprache festgelegt.'
    }
});
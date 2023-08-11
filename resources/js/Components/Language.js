export default class Language {

    replaceMonth(str)  {
        return str.replaceAll('January', 'Janvier')
            .replaceAll('February', 'Février')
            .replaceAll('March', 'Mars')
            .replaceAll('April', 'Avril')
            .replaceAll('May', 'Mai')
            .replaceAll('June', 'Juin')
            .replaceAll('July', 'Julliet')
            .replaceAll('August', 'Août')
            .replaceAll('September', 'Septembre')
            .replaceAll('October', 'Octobre')
            .replaceAll('November', 'Novembre')
            .replaceAll('December', 'Décembre')
    }
}
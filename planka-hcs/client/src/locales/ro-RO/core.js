import dateFns from 'date-fns/locale/ro';

export default {
  dateFns,

  format: {
    date: 'P',
    time: 'HH:mm',
    dateTime: '$t(format:date) $t(format:time)',
    longDate: 'd MMM',
    longDateTime: "d MMMM 'в' p",
    fullDate: 'd MMM y',
    fullDateTime: "d MMMM y 'в' p",
  },

  translation: {
    common: {
      aboutPlanka: 'Despre Kanban 3.0',
      account: 'Cont',
      actions: 'Acțiuni',
      addAttachment_title: 'Adauga atasament',
      addComment: 'Adaugă comentariu',
      addManager_title: 'Adaugă Manager',
      addMember_title: 'Adaugă Membru',
      addUser_title: 'Adaugă Utilizator',
      administrator: 'Administrator',
      all: 'Toate',
      allChangesWillBeAutomaticallySavedAfterConnectionRestored:
        'Toate modificarile vor fi salvate automat<br />dupa restabilirea conexiunii.',
      areYouSureYouWantToDeleteThisAttachment: 'Sigur doriți să ștergeți acest atașament?',
      areYouSureYouWantToDeleteThisBoard: 'Sigur doriți să ștergeți acest panou?',
      areYouSureYouWantToDeleteThisCard: 'Sigur doriți să ștergeți acest card?',
      areYouSureYouWantToDeleteThisComment: 'Sigur doriți să ștergeți acest comentariu?',
      areYouSureYouWantToDeleteThisLabel: 'Sigur doriți să ștergeți această etichetă?',
      areYouSureYouWantToDeleteThisList: 'Sigur doriți să ștergeți această listă?',
      areYouSureYouWantToDeleteThisProject: 'Sigur doriți să ștergeți acest proiect?',
      areYouSureYouWantToDeleteThisTask: 'Sigur doriți să ștergeți această sarcină?',
      areYouSureYouWantToDeleteThisUser: 'Sigur doriți să ștergeți acest utilizator?',
      areYouSureYouWantToLeaveBoard: 'Ești sigur că vrei să părăsești tabla?',
      areYouSureYouWantToLeaveProject: 'Ești sigur că vrei să părăsești proiectul?',
      areYouSureYouWantToRemoveThisManagerFromProject:
        'Sigur doriți să eliminați acest manager din proiect?',
      areYouSureYouWantToRemoveThisMemberFromBoard:
        'Sigur doriți să eliminați acest membru din consiliu?',
      attachment: 'Atașament',
      attachments: 'Atasamente',
      authentication: 'Autentificare',
      background: 'Fundal',
      board: 'Tabla',
      boardNotFound_title: 'Tabla nu a fost găsită',
      canComment: 'Poate comenta',
      canEditContentOfBoard: 'Poate edita conținutul tablei.',
      canOnlyViewBoard: 'Poate doar vizualiza tabla.',
      cardActions_title: 'Acțiuni cu carduri',
      cardNotFound_title: 'Cardul nu a fost găsit',
      cardOrActionAreDeleted: 'Cardul sau acțiunea sunt șterse.',
      color: 'Culoarea',
      createBoard_title: 'Creare Tabla',
      createLabel_title: 'Creați etichetă',
      createNewOneOrSelectExistingOne: 'Crează unu nou sau selectează<br />unu deja existent.',
      createProject_title: 'Crează Proiect',
      createTextFile_title: 'Crează un Fișier Text',
      currentPassword: 'Parola Curentă',
      dangerZone_title: 'Zona periculoasă',
      date: 'Data',
      dueDate_title: 'Data scadentă',
      deleteAttachment_title: 'Ștergeți atașamentul',
      deleteBoard_title: 'Ștergeți Tabla',
      deleteCard_title: 'Ștergeți cardul',
      deleteComment_title: 'Șterge comentariul',
      deleteLabel_title: 'Ștergeți eticheta',
      deleteList_title: 'Șterge lista',
      deleteProject_title: 'Șterge proiectul',
      deleteTask_title: 'Ștergeți sarcina',
      deleteUser_title: 'Șterge utilizator',
      description: 'Descriere',
      detectAutomatically: 'Detectează automat',
      dropFileToUpload: 'Aruncă fișierul pentru a încărca',
      editor: 'Editor',
      editAttachment_title: 'Editați atașamentul',
      editAvatar_title: 'Editați avatarul',
      editBoard_title: 'Editați tabla',
      editDueDate_title: 'Editați data scadentă',
      editEmail_title: 'Editați E-mail',
      editInformation_title: 'Editați informații',
      editLabel_title: 'Editați eticheta',
      editPassword_title: 'Editați parola',
      editPermissions_title: 'Editați permisiunile',
      editStopwatch_title: 'Editați cronometrul',
      editUsername_title: 'Editați numele de utilizator',
      email: 'E-mail',
      emailAlreadyInUse: 'E-mail deja utilizat',
      enterCardTitle: 'Introduceți titlul cardului... [Ctrl+Enter] pentru a se deschide automat.',
      enterDescription: 'Introduceți descrierea...',
      enterFilename: 'Introduceți numele fișierului',
      enterListTitle: 'Introduceți titlul listei...',
      enterProjectTitle: 'Introduceți titlul proiectului',
      enterTaskDescription: 'Introduceți descrierea sarcinii...',
      filterByLabels_title: 'Filtrați după etichete',
      filterByMembers_title: 'Filtrați după membri',
      fromComputer_title: 'De pe computer',
      fromTrello: 'De pe Trello',
      general: 'General',
      hours: 'Ore',
      importBoard_title: 'Import Tabla',
      invalidCurrentPassword: 'Parolă actuală nevalidă',
      labels: 'Etichete',
      language: 'Limba',
      leaveBoard_title: 'Părăsiți Tabla',
      leaveProject_title: 'Părăsiți proiectul',
      list: 'Lista',
      listActions_title: 'Listează acțiuni',
      managers: 'Managerii',
      members: 'Membri',
      minutes: 'Minute',
      moveCard_title: 'Mutați cardul',
      name: 'Nume',
      newEmail: 'Email nou',
      newPassword: 'Parolă Nouă',
      newUsername: 'Nume de utilizator nou',
      noConnectionToServer: 'Nicio conexiune la server',
      noBoards: 'Fără Table',
      noLists: 'Fără Liste',
      noProjects: 'Fără proiecte',
      notifications: 'Notificări',
      noUnreadNotifications: 'Fără notificări necitite.',
      openBoard_title: 'Tablă deschisă',
      optional_inline: 'optional',
      organization: 'Organizatia',
      phone: 'Telefon',
      preferences: 'Preferințe',
      pressPasteShortcutToAddAttachmentFromClipboard:
        'Sfat: apăsați Ctrl-V (Cmd-V pe Mac) pentru a adăuga un atașament din clipboard.',
      project: 'Proiect',
      projectNotFound_title: 'Proiectul nu a fost găsit',
      removeManager_title: 'Eliminați Manager',
      removeMember_title: 'Eliminați membru',
      searchLabels: 'Căutați etichete...',
      searchMembers: 'Căutați membri...',
      searchUsers: 'Căutați utilizatori...',
      seconds: 'Secunde',
      selectBoard: 'Selectați tabla',
      selectList: 'Selectați lista',
      selectPermissions_title: 'Selectați Permisiuni',
      selectProject: 'Selectați proiectul',
      settings: 'Setări',
      stopwatch: 'Cronometru',
      subscribeToMyOwnCardsByDefault: 'Abonați-vă la propriile carduri în mod implicit',
      taskActions_title: 'Acțiuni de sarcină',
      tasks: 'Sarcini',
      thereIsNoPreviewAvailableForThisAttachment:
        'Nu există nicio previzualizare disponibilă pentru acest atașament.',
      time: 'Timp',
      title: 'Titlu',
      userActions_title: 'Acțiunile utilizatorului',
      userAddedThisCardToList: '<0>{{user}}</0><1> a adăugat acest card în {{list}}</1>',
      userLeftNewCommentToCard:
        '{{user}} a lăsat un nou comentariu «{{comment}}» în <2>{{card}}</2>',
      userMovedCardFromListToList:
        '{{user}} a mutat <2>{{card}}</2> din {{fromList}} în {{toList}}',
      userMovedThisCardFromListToList:
        '<0>{{user}}</0><1> a mutat aceast card din {{fromList}} în {{toList}}</1>',
      username: 'Nume utilizator',
      usernameAlreadyInUse: 'Nume utilizator deja exista',
      users: 'Utilizatori',
      version: 'Versiunea',
      viewer: 'Vizualizator',
      writeComment: 'Scrie un comentariu...',
    },

    action: {
      addAnotherCard: 'Adăugați un alt card',
      addAnotherList: 'Adăugați o altă listă',
      addAnotherTask: 'Adăugați o altă sarcină',
      addCard: 'Adăugați card',
      addCard_title: 'Adăugați card',
      addComment: 'Adauga comentariu',
      addList: 'Adăugați listă',
      addMember: 'Adăugați membru',
      addMoreDetailedDescription: 'Adăugați descrierea mai detaliata',
      addTask: 'Adăugați sarcină',
      addToCard: 'Adauga în card',
      addUser: 'Adăugați utilizator',
      createBoard: 'Creați tablă',
      createFile: 'Creați fișier',
      createLabel: 'Creați eticheta',
      createNewLabel: 'Creați o nouă etichetă',
      createProject: 'Creați proiect',
      delete: 'Ștergeți',
      deleteAttachment: 'Ștergeți atașamentul',
      deleteAvatar: 'Ștergeți avatarul',
      deleteBoard: 'Ștergeți tabla',
      deleteCard: 'Ștergeți cardul',
      deleteCard_title: 'Ștergeți Cardul',
      deleteComment: 'Șterge comentariu',
      deleteImage: 'Șterge imaginea',
      deleteLabel: 'Ștergeți Eticheta',
      deleteList: 'Ștergeți lista',
      deleteList_title: 'Ștergeți Lista',
      deleteProject: 'Ștergeți proiectul',
      deleteProject_title: 'Ștergeți Proiectul',
      deleteTask: 'Ștergeți sarcina',
      deleteTask_title: 'Ștergeți Sarcina',
      deleteUser: 'Ștergeți utilizatorul',
      edit: 'Editați',
      editDueDate_title: 'Editați data scadentă',
      editDescription_title: 'Editați descrierea',
      editEmail_title: 'Editați e-mailul',
      editInformation_title: 'Editați informații',
      editPassword_title: 'Editați parola',
      editPermissions: 'Editați permisiunile',
      editStopwatch_title: 'Editați cronometrul',
      editTitle_title: 'Editați Titlul',
      editUsername_title: 'Editați Numele Utilizator',
      hideDetails: 'Ascunde detalii',
      import: 'Import',
      leaveBoard: 'Părăsiți bordul',
      leaveProject: 'Părăsiți proiect',
      logOut_title: 'Deconectați-vă',
      makeCover_title: 'Faceți Coperta',
      move: 'Mutați',
      moveCard_title: 'Mutați cardul',
      remove: 'Eliminați',
      removeBackground: 'Eliminați fundalul',
      removeCover_title: 'Eliminați Coperta',
      removeFromBoard: 'Eliminați din Tabla',
      removeFromProject: 'Eliminați din proiect',
      removeManager: 'Eliminați managerul',
      removeMember: 'Eliminați membrul',
      save: 'Salveaza',
      showAllAttachments: 'Afișați toate atașamentele ({{hidden}} ascunse)',
      showDetails: 'Arată detalii',
      showFewerAttachments: 'Afișați mai puține atașamente',
      start: 'Start',
      stop: 'Stop',
      subscribe: 'Abonati-va',
      unsubscribe: 'Dezabonați-vă',
      uploadNewAvatar: 'Încărcați un avatar nou',
      uploadNewImage: 'Încărcați o nouă imagine',
    },
  },
};

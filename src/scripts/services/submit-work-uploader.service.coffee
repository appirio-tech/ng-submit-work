'use strict'

SubmitWorkUploaderService = (API_URL) ->
  generateConfig = (workId, assetType) ->
    domain = API_URL
    category = 'work'

    uploaderConfig =
      name: "#{assetType}-uploader-#{workId}"
      allowMultiple: true
      query:
        url: domain + '/v3/attachments'
        params:
          filter: "id=#{workId}&assetType=#{assetType}&category=#{category}"
          fields: 'url'
      presign:
        url: domain + '/v3/attachments/uploadurl'
        params:
          id: workId
          assetType: assetType
          category: category
      createRecord:
        url: domain + '/v3/attachments'
        params:
          id: workId
          assetType: assetType
          category: category
      removeRecord:
        url: domain + '/v3/attachments/:fileId'
        params:
          filter: 'category=' + category

    uploaderConfig

  generateConfig: generateConfig

SubmitWorkUploaderService.$inject = ['API_URL']

angular.module('appirio-tech-ng-submit-work').factory 'SubmitWorkUploaderService', SubmitWorkUploaderService
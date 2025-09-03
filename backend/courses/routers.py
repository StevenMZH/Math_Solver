class MongoRouter:
    route_app_labels = {'classcontent'}

    def db_for_read(self, model, **hints):
        if model._meta.model_name in self.route_app_labels:
            return 'mongodb'
        return 'default'

    def db_for_write(self, model, **hints):
        if model._meta.model_name in self.route_app_labels:
            return 'mongodb'
        return 'default'

    def allow_relation(self, obj1, obj2, **hints):
        if (
            obj1._meta.model_name in self.route_app_labels or
            obj2._meta.model_name in self.route_app_labels
        ):
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if model_name in self.route_app_labels:
            return db == 'mongodb'
        return db == 'default'

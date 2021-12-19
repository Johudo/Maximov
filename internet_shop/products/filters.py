from django.contrib import admin
import django_filters
import json
from products.models import Product


class InputFilterAdmin(admin.SimpleListFilter):
    template = "admin/text_input_filter.html"

    def lookups(self, request, model_admin):
        # Dummy, required to show the filter.
        return ((),)

    def choices(self, changelist):
        # Grab only the "all" option.
        all_choice = next(super().choices(changelist))
        all_choice["query_parts"] = (
            (k, v)
            for k, v in changelist.get_filters_params().items()
            if k != self.parameter_name
        )
        yield all_choice


class NameFilter(InputFilterAdmin):
    parameter_name = "product_name"
    title = "Название"

    def queryset(self, request, queryset):
        value = self.value()

        if value is None:
            return queryset

        return queryset.filter(name__icontains=value)


class ProductListFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr="icontains")
    min_price = django_filters.CharFilter(method="get_min_price")
    max_price = django_filters.CharFilter(method="get_max_price")
    types = django_filters.CharFilter(method="types__in")
    providers = django_filters.CharFilter(method="providers__in")

    def get_min_price(self, queryset, key, value):
        return queryset.distinct().filter(price__gte=value)

    def get_max_price(self, queryset, key, value):
        return queryset.distinct().filter(price__lte=value)

    def providers__in(self, queryset, value, *args, **kwargs):
        try:
            if args:
                providers_list = args[0].split(",")
                if (not isinstance(providers_list, list)) or len(providers_list) == 0:
                    return queryset

                queryset = queryset.distinct().filter(provider__in=providers_list)
        except ValueError:
            pass

        return queryset

    def types__in(self, queryset, value, *args, **kwargs):
        try:
            if args:
                types_list = args[0].split(",")
                if (not isinstance(types_list, list)) or len(types_list) == 0:
                    return queryset

                queryset = queryset.distinct().filter(type__in=types_list)
        except ValueError:
            pass

        return queryset

    class Meta:
        model = Product
        fields = [
            "name",
            "min_price",
            "max_price",
            # "types",
            "providers",
        ]

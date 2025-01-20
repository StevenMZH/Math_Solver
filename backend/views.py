from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .algebraic.equation import Equation, toLatex

class SimplifyEquationView(APIView):
    def post(self, request):
        try:
            # Get the Request Expression
            equation_str = request.data.get("equation", "" )
            if not equation_str:
                return Response({"error": "No equation provided"}, status=status.HTTP_400_BAD_REQUEST)

            # Data Processing
            equation = Equation(equation_str)
            simplified = str(equation.getSymplified())
            latexOutput = toLatex(simplified)
            latexInput = toLatex(equation_str)

            # Response
            return Response({"simplified_equation": latexOutput, "inputLatex": latexInput}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"Sintax Error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class toLatexView(APIView):
    def post(self, request):
        try:
            equation_str = request.data.get("equation", "" )
            if not equation_str:
                return Response({"error": "No equation provided"}, status=status.HTTP_400_BAD_REQUEST)
            latex = toLatex(equation_str)
            return Response({"simplified_equation": latex}, status=status.HTTP_200_OK)
                
        except Exception as e:
            return Response({"Sintax Error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)